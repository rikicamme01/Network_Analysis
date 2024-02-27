from django.shortcuts import render

# Create your views here.
def netAdmin (request):
    return render(request, "netAdmin/prova.html")

def singUp(request):

    if request.method == 'POST':
        username = request.POST['username']
        #firstname = 
        #lastName = 
        pass

    return render(request, 'netAdmin/authentication/singUp.html')

def logIn(request):
    pass