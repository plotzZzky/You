def serializer_modal(item, user, request):
    post_id = item.id
    text = item.text
    image = item.image.url
    date = item.date
    follow = True if item.user in user.profile.follows.all() else False
    user_id = item.user.id
    username = item.user.username
    pic = item.user.profile.image.url
    liked = True if user in item.likes.all() else False
    likes = len(item.likes.all())
    me = True if request.user == user else False
    user = {"id": user_id, "username": username, "img": pic, "follow": follow, "me": me}
    comments = [{"id": x.id, "text": x.text, "username": x.user.username, "date": x.date,
                 'your': check_your(request, x.user)} for x in item.comments.all()]
    post = {"user": user, 'id': post_id, "text": text, "image": image, "date": date, "liked": liked, "likes": likes,
            "comments": comments, 'your': check_your(request, item.user)}
    return post


def check_your(request, user):
    result = True if request.user == user else False
    return result


def serializer_post(item):
    post_id = item.id
    image = item.image.url
    post = {'id': post_id, "image": image}
    return post
