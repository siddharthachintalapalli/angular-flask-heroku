from pymongo import MongoClient
import csv
import json 
import time
import datetime

client = MongoClient("mongodb+srv://Shobhit2000:Shobhit2000.@tutorpoint.ljjdee1.mongodb.net/?retryWrites=true&w=majority")

db = client.tutorpoint
mycollection = db.crud_tutorpoint

def format_date(old_date):
    old_date = str(old_date)
    slash1 = old_date.find('.')
    slash2 = old_date.find('.', 3)
    d1 = old_date[:slash1]
    m1 = old_date[slash1+1:slash2]
    y1 = old_date[slash2+1:]
    new_date = datetime.datetime(int(y1), int(m1), int(d1))
    new_date = new_date.strftime('%d/%m/%Y')
    return(new_date)

# for first time usage only
# Create Database and Insert all records in mongodb database
def create_data():
    
    with open('masterdata_2016.csv', 'r') as file_obj:
        reader_obj = csv.reader(file_obj)
        for row in reader_obj:
            if(row[0] != 'CardID'):
                b_date = str(format_date(row[8]))
                v_date = str(format_date(row[9]))
                print(b_date, v_date)

                rec={'CardID': row[0],
                    'CustID': row[1],
                    'Title': row[2],
                    'Country': row[3],
                    'Address': row[4],
                    'PostalCode': row[5],
                    'City': row[6],
                    'Mail': row[7],
                    'BirthDate': b_date,
                    'ValidityDate': v_date 
                    }
                
                # inserting the data in the database
                mycollection.insert_one(rec)
    return('Inserted')

# INSERT - BY ADMIN ONLY
def add_new_data(user_record):
    try:
        if(mycollection.find_one(user_record)) == None:
            mycollection.insert_one(user_record)
            return('Data added')
        else:
            return('User already present')
    except:
        return('Error adding data')

# DELETE - BY ADMIN ONLY
def delete_user(CustomerID):  
    try:
        if(mycollection.find_one({"CustID" : CustomerID})) != None:
            mycollection.delete_one({"CustID" : CustomerID})
            return('Record Deleted')
        else:
            return('No Exsisting Record')
    except:
        return('Error')

# UPDATE - BY ADMIN ONLY
def update_record(old_customer_id, updated_json):
    try:
        old_customer_id = int(old_customer_id)
        mycollection.update_one({"CustID" : old_customer_id}, {"$set": updated_json}, upsert=False)
        return ('User data updated')
    except:
        return ('Error modifying data')

def read_modifier(rec):
    print(rec)
    rec = [rec['CardID'], rec['CustID'], rec['Title'], rec['Country'], rec['Address'], rec['PostalCode'],
            rec['City'], rec['Mail'], rec['BirthDate'], rec['ValidityDate']]
    return rec

# READ ALL - BY ADMIN ONLY
def read_all():
    try:
        rec = mycollection.find()
        record = []

        for i in rec:
            record.append(read_modifier(i))

        return record
    except:
        return ('Error reading values')

# READ ONE
def read_one(CustomerID):
    try:
        rec = mycollection.find_one({"CustID" : CustomerID})
        if (rec != None):
            rec = read_modifier(rec)
            return rec
        else:
            return('No record found')
    except:
        return('No record found')

# LOGIN
def login(CustomerID):
    return (read_one(CustomerID))
