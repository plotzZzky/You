from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required

from .models import Post, Comment
from .forms import PostForm


# # # # # # # # # # # # # # # # Your profile # # # # # # # # # # # # # # # #
@login_required()
def show_your_profile(request):
    user = request.user
    posts = Post.objects.filter(user=user, image='').order_by("-id")  #type: ignore
    data = {'user': user,'posts': posts}
    return render(request, 'profile.html', data)


@login_required()
def get_friends(request, user_id):
    user = User.objects.get(pk=user_id)
    friends = user.profile.friends.all()
    users = User.objects.filter(id__in=friends)
    data = {'friends': users}
    return render(request, 'friends.html', data)


# Return posts to timeline
@login_required()
def get_your_posts(request, user_id):
   posts = Post.objects.filter(user=user_id, image='').order_by("-id")  #type: ignore
   data = {'posts': posts}
   if not posts:
       data = {}
   return render(request, 'posts.html', data)


@login_required()
def get_your_images(request, user_id):
   posts = Post.objects.filter(user=user_id).exclude(image='').order_by("-id")  #type: ignore
   data = {'posts': posts}
   return render(request, 'posts.html', data)


# # # # # # # # # # # # # # # # Another user profile # # # # # # # # # # # # # # # #
@login_required()
def show_user_profile(request, user_id):
    if user_id == request.user.id:
        return redirect('show_your_profile')
    user = User.objects.get(pk=user_id)
    posts = Post.objects.filter(pk=user_id, image='').order_by("-id")  #type: ignore
    data = {'user': user, 'you': request.user, 'posts': posts}
    return render(request, 'profile.html', data)


# # # # # # # # # # # # # # # # Get friends # # # # # # # # # # # # # # # #
@login_required()
def find_peoples(request):
    list_f = request.user.profile.friends.all()
    friends = User.objects.all().exclude(id__in=list_f).exclude(id=request.user.id).exclude(username='admin')
    data = {'friends': friends}
    return render(request, 'find_friends.html', data)


# # # # # # # # # # # # # # # # Posts # # # # # # # # # # # # # # # #
@login_required()
def show_friends_thinking(request):
    friends = request.user.profile.friends.all()
    query = Post.objects.filter(user__in=friends, image='').order_by("-id")  #type: ignore
    user_query = Post.objects.filter(user=request.user, image='')  #type: ignore
    posts = query.union(user_query)
    data = {'posts': posts}
    return render(request, 'timeline.html', data)


@login_required()
def show_thinking(request):
    post = Post.objects.filter(image='').exclude(user=request.user).order_by("-id")  #type: ignore
    data = {'posts': post}
    return render(request, 'timeline.html', data)


@login_required()
def show_friends_images(request):
    friends = request.user.profile.friends.all()
    query = Post.objects.filter(user__in=friends).exclude(image='').order_by("-id")  #type: ignore
    user_query = Post.objects.filter(user=request.user).exclude(image='').order_by("-id")  #type: ignore
    posts = query.union(user_query)
    data = {'posts': posts}
    return render(request, 'timeline.html', data)


@login_required()
def show_images(request):
    post = Post.objects.all().exclude(user=request.user).exclude(image='').order_by("-id")  #type: ignore
    data = {'posts': post}
    return render(request, 'timeline.html', data)


# # # # # # # # # # # # # # # # Posts # # # # # # # # # # # # # # # #
@login_required()
def add_post(request):
    if request.method == 'GET':
        form = PostForm()
        data = {'form': form}
        return render(request, 'add_post.html', data)
    else:
        form = PostForm(request.POST, request.FILES)
        if form.is_valid:
            try:
                image = request.FILES['image']
            except KeyError:
                image = None
            text = request.POST['text']
            post = Post(user=request.user, image=image, text=text)
            post.save()
            return redirect('show_your_profile')


@login_required()
def get_modal(request, post_id):
    post = Post.objects.get(pk=post_id)  # type: ignore
    comments = Comment.objects.filter(post=post)  #type: ignore
    data = {'post': post, 'comments': comments}
    return render(request, 'modal.html', data)


@login_required()
def delete_post(request, post_id):
    post = Post.objects.get(pk=post_id, user=request.user)  # type: ignore
    post.delete()
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


# # # # # # # # # # # # # # # # Managers # # # # # # # # # # # # # # # #
@login_required()
def like_manager(request, post_id):
    post = Post.objects.get(pk=post_id)  # type: ignore
    if request.user in post.likes.all():
        post.likes.remove(request.user)
    else:
        post.likes.add(request.user)
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


@login_required()
def follow_manager(request, user_id):
    user = User.objects.get(pk=user_id)
    you = request.user
    friends = you.profile.friends
    if user in friends.all():
        friends.remove(user)
    else:
        friends.add(user)
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


# # # # # # # # # # # # # # # # Comments # # # # # # # # # # # # # # # #
@login_required()
def add_comment(request, post_id):
    post = Post.objects.get(pk=post_id)  #type: ignore
    text = request.POST['text']
    comment = Comment(user=request.user, post=post, text=text)
    comment.save()
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))


@login_required()
def delete_comment(request, comment_id):
    comment = Comment.objects.get(pk=comment_id, user=request.user)  # type: ignore
    comment.delete()
    return HttpResponseRedirect(request.META.get('HTTP_REFERER'))