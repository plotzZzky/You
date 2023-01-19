from django import forms

from .models import Post, Comment


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = '__all__'

    image = forms.ImageField(required=False, widget=forms.FileInput(attrs={'id': 'loadImage',
                                                           'onchange': 'previewImage();'}))
    text = forms.CharField(required=False, widget=forms.TextInput(
        attrs={'placeholder': 'Fale o que você esta pensando', 'class':'image-description'}))


class CommentsForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = '__all__'

    text = forms.CharField(required=False, widget=forms.TextInput(
        attrs={'placeholder': 'Fale o que você esta pensando', 'class':'comment-text'}))