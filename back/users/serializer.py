
def serialize_user(user):
    username = user.username
    email = user.email
    image = user.profile.image
    question = user.profile.question
    answer = user.profile.answer
    user_dict = {"username": username, "email": email, "image": image.url, "question": question, "answer": answer}
    return user_dict
