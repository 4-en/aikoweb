from sqlitedict import SqliteDict
db = SqliteDict("example.sqlite")


def print_keys(obj):
    # print keys and values
    for key in obj.keys():
        print(key, obj[key])


def set_key(obj):
    key = input("Enter key: ")
    if key == "":
        return False
    
    value = input("Enter value: ")
    if value == "":
        return False
    
    obj[key] = value
    return True


cont = True
my_obj = {}
if "my_obj" in db:
    my_obj = db["my_obj"]

while cont:
    print_keys(my_obj)
    cont = set_key(my_obj)

db["my_obj"] = my_obj
db.commit()
db.close()
