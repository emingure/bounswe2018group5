from project import models as project_models
from user import models as user_models
from django.db.models import Avg, Window
from datetime import datetime

def user_json(user, user_id=""):
    obj = {}
    obj['id'] = str(user.id)
    obj['full_name'] = user.full_name
    obj['username'] = user.username
    obj['email'] = user.email
    obj['type'] = user.type
    obj['gender'] = user.gender
    obj['bio'] = user.bio
    obj['profile_image'] = user.profile_image
    obj['created_at'] = format_datetime(user.created_at)
    obj['updated_at'] = format_datetime(user.updated_at)
    ratings_rater = user_models.Rating.objects.filter(rater=user)
    ratings_rated = user_models.Rating.objects.filter(rated=user)
    obj['ratings'] = {}
    obj['ratings']['rater'] = []
    for rating in ratings_rater:
        obj['ratings']['rater'].append(rating_json(rating, "user"))
    obj['ratings']['rated'] = []
    for rating in ratings_rated:
        obj['ratings']['rated'].append(rating_json(rating, "user"))
    obj['avg_rating'] = ratings_rated.average('value')
    portfolios = user_models.Portfolio.objects.filter(user=user)
    obj['portfolios'] = []
    for portfolio in portfolios:
        obj['portfolios'].append(portfolio_json(portfolio, from_model="user"))
    wallet = user_models.Wallet.objects.get(user=user)
    obj['wallet'] = wallet_json(wallet)
    return obj


def project_json(project,user_id):
    obj = {}
    obj['project_id'] = str(project.id)
    obj['title'] = project.title
    obj['budget'] = project.budget
    obj['description'] = project.description
    obj['deadline'] = format_datetime(project.project_deadline) if project.project_deadline is None else None
    obj['created_at'] = format_datetime(project.created_at)
    obj['updated_at'] = format_datetime(project.updated_at)
    obj['owner'] = user_json(project.owner)
    obj['freelancer'] = None if project.freelancer is None \
        else user_json(project.freelancer)
    obj['status'] = project.status
    bids = project_models.Bid.objects.filter(project=project)
    obj['bids'] = []
    for bid in bids:
        obj['bids'].append(bid_json(bid, user_id))
    ratings = user_models.Rating.objects.filter(project=project)
    obj['ratings'] = []
    for rating in ratings:
        obj['ratings'].append(rating_json(rating, from_model= "project"))
    obj['milestones'] = project.milestones
    return obj


def bid_json(bid, user_id):
    obj = {}
    obj['bid_id'] = str(bid.id)
    obj['freelancer'] = {}
    if (user_id == str(bid.project.owner.id)) or (user_id == str(bid.freelancer.id)):
        obj['freelancer']['id'] = str(bid.freelancer.id)
        obj['freelancer']['full_name'] = str(bid.freelancer.full_name)
        obj['freelancer']['username'] = str(bid.freelancer.username)
        obj['freelancer']['profile_image'] = str(bid.freelancer.profile_image)
        obj['note'] = bid.note
    else:
        obj['freelancer']['full_name'] = hide_name(str(bid.freelancer.full_name))
    obj['offer'] = bid.offer
    obj['status'] = bid.status
    obj['created_at'] = format_datetime(bid.created_at)
    obj['updated_at'] = format_datetime(bid.updated_at)
    return obj


def rating_json(rating, from_model):
    obj = {}
    obj['id'] = str(rating.id)
    if from_model != "project":
        obj['project'] = {}
        obj['project']['id'] = str(rating.project.id)
        obj['project']['title'] = rating.project.title

    obj['rater'] = {}
    obj['rater']['id'] = str(rating.rater.id)
    obj['rater']['full_name'] = str(rating.rater.full_name)
    obj['rater']['username'] = str(rating.rater.username)
    obj['rater']['profile_image'] = str(rating.rater.profile_image)

    obj['rated'] = {}
    obj['rated']['id'] = str(rating.rated.id)
    obj['rated']['full_name'] = str(rating.rated.full_name)
    obj['rated']['username'] = str(rating.rated.username)
    obj['rated']['profile_image'] = str(rating.rated.profile_image)

    obj['value'] = rating.value
    obj['comment'] = rating.comment

    obj['created_at'] = format_datetime(rating.created_at)
    obj['updated_at'] = format_datetime(rating.updated_at)
    return obj


def wallet_json(wallet):
    obj = {}
    obj['balance'] = wallet.balance
    return obj

def hide_name(name):
    divs = name.split(" ")
    res = ""
    for div in divs:
        res = res + div[0] + len(div[1:])*"*" + " "
    return res

def portfolio_json(portfolio, from_model=""):
    obj = {}
    obj['id'] = str(portfolio.id)
    obj['title'] = portfolio.title
    obj['description'] = portfolio.description
    obj['date'] = format_datetime(portfolio.date) if portfolio.date != None else None
    if from_model != "user":
        obj['user'] = {
            'id': str(portfolio.user.id),
            'username': portfolio.user.username,
            'full_name': portfolio.user.full_name,
            'profile_image': portfolio.user.profile_image
        }
    obj['project_id'] = portfolio.project_id
    obj['created_at'] = format_datetime(portfolio.created_at)
    obj['updated_at'] = format_datetime(portfolio.updated_at)
    return obj

def format_datetime(dt):
    return dt.strftime("%Y-%m-%d")