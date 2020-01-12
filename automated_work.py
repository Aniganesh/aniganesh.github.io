'''for i in range(12):
    for j in range(12):
        if(i < j):
            print(".col-"+str(i+1)+"-"+str(j+1)+"{grid-column-start:"+str(i+1)+ ";grid-column-end: "+str(j+1)+";}")
    
'''
for side in ['t', 'b', 'l', 'r']:
    print("document.querySelectorAll(\"[class*=\'m-"+side+"-\']\");")
    print("document.querySelectorAll(\"[class*=\'p-"+side+"-\']\");")

'''
print("/[p][\-]["+side+"][\-][0-9]/")
print("/[m][\-]["+side+"][\-][0-9]/") '''
