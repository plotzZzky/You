from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User

from .forms import UserLoginForm, CustomUserCreationForm, EditUserForm
from .models import Profile


def login_user(request):
    if request.user.is_authenticated:
        return redirect('/profiles/')
    else:
        if request.method == 'GET':
            login_form = UserLoginForm()
            signup_form = CustomUserCreationForm()
            return render(request, 'login.html', {'login': login_form, 'signup': signup_form})
        else:
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('/profiles/')
            else:
                return redirect('/users/login')


def register_user(request):
    form = CustomUserCreationForm(request.POST)
    if form.is_valid():
        form.save()
        username = request.POST['username']
        password = request.POST['password1']
        image = 'profile/default.webp'
        user = authenticate(username=username, password=password)
        profile = Profile.objects.create(image=image, user=user)  # type: ignore
        profile.save()
        if user is not None:
            login(request, user)
            return redirect('/profiles/')
    else:
        return redirect('/users/login')


@login_required()
def logout_user(request):
    logout(request)
    return redirect('/users/login')


@login_required()
def edit_user(request):
    if request.method == 'POST':
        form = EditUserForm(user=request.user, data=request.POST)
        if form.is_valid(user=request.user, data=request.POST):
            user = User.objects.get(pk=request.user.id)
            user.username = request.POST['username']
            user.email = request.POST['email']
            pwd = request.POST['password1']
            pwd2 = request.POST['password2']
            if pwd == pwd2 and pwd2 != '' and pwd != '':
                user.set_password(pwd)
                update_session_auth_hash(request, user)
            try:
                picture = request.FILES['image']
                user.profile.image = picture
                user.profile.save()
            except KeyError:
                pass
            user.save()
            return redirect('/profiles/')
    else:
        form = EditUserForm(user=request.user)
        data = {'form': form}
        return render(request, 'edit.html', data)
