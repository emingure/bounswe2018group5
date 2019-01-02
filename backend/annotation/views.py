from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from user import authentication, models, views
from datetime import datetime
from api.utils import *
from api.semantic_tags import create_tag
from django.db.models import Q

import json
from .models import *
from user.models import *


@csrf_exempt
def annotation_handler(request):
    token = request.META.get('HTTP_AUTHORIZATION', None)
    if request.method == 'GET':
        try:
            query = request.GET.get('query')
            annotations = Annotation.objects.filter(annotation_object__IRI=query)
            return JsonResponse({"response": True, "annotations": annotations})
        except Exception as e:
            return JsonResponse({'response': False, 'error': str(e)})
    elif request.method == 'POST':
        if token and authentication.is_authenticated(token):
            try:
                user_id = authentication.get_user_id(token)
                request_data = request.data
                targets = []
                if 'targets' in request_data:
                    targets = request_data['targets']
                body = request_data['body'] if 'body' in request_data else None
                annotation = Annotation()
                annotation.context = request_data['context']
                annotation.IRI = request_data['url']
                annotation.motivation = request_data['motivation']
                annotation.creator = request_data['creator']
                annotation.save()

                if body:
                    new_body = Body()
                    new_body.annotation = annotation
                    new_body.IRI = request_data['url']
                    new_body.type = body['type']
                    new_body.text = body['text'] if body['type'] == 'text' else None
                    new_body.save()

                if len(targets) > 0:
                    for target in targets:
                        new_target = Target()
                        new_target.annotation = annotation
                        new_target.context = target['context'] if 'context' in target else None
                        new_target.type = target['type']
                        new_target.IRI = target['IRI']
                        new_target.x = target['x'] if 'x' in target else None
                        new_target.y = target['y'] if 'y' in target else None
                        new_target.start = target['start'] if 'start' in target else None
                        new_target.end = target['end'] if 'end' in target else None
                        target.save()

                return JsonResponse({"response": True, "annotation": annotation.annotation_object})
            except Exception as e:
                return JsonResponse({'response': False, 'error': str(e)})
        else:
            return JsonResponse({"response": False, "error": "Unauthorized"})
