from flask import Flask, request, jsonify
import mongo_db
import clustering
from flask_cors import cross_origin, CORS

application = Flask(__name__)
CORS(application, support_credentials=True)

# test route
@application.route('/', methods=['GET'])
@cross_origin(support_credentials=True)
def index():
    if request.method == "GET":
        return jsonify({'out': ' Welcome to the app'})
    else:
        return jsonify({'out': 'error'})

# Add new user
@application.route('/new_user/', methods=['POST'])
@cross_origin(support_credentials=True)
def new_user():
    if request.method == "POST":
        user_data = request.json
        s = mongo_db.add_new_data(user_data)
        return jsonify({'response': s})
    else:
        return jsonify({'out': 'error'})

# Login
@application.route('/login/', methods=['POST', 'GET'])
@cross_origin(support_credentials=True)
def login():
    if request.method == "POST":
        CustomerID = request.json
        user_data = mongo_db.login(CustomerID['CustID'])
        return jsonify({'response': user_data})
    else:
        return jsonify({'out': 'error'})

# Read User details
@application.route('/read/', methods=['POST'])
@cross_origin(support_credentials=True)
def read():
    if request.method == "POST":
        user = request.json

        if user['CustID']==0:
            lst = mongo_db.read_all()
            return jsonify({'response': lst})
        
        elif user['CustID']!=0:
            lst = mongo_db.read_one(user['CustID'])
            return ({'response': lst})
    else:
        return ({'out': 'error'})

# Delete User
@application.route('/delete_user/', methods=['POST'])
@cross_origin(support_credentials=True)
def del_user():
    if request.method == "POST":
        user = request.json
        s = mongo_db.delete_user(user['CustID'])
        return jsonify({'response': s})
    else:
        return jsonify({'out': 'error'})

# UPDATE
@application.route('/modify_user/<old_customer_id>', methods=['POST'])
@cross_origin(support_credentials=True)
def modify_user(old_customer_id):
    if request.method == "POST":
        user_data = request.json
        # Delete
        s = mongo_db.delete_user(old_customer_id)
        # Add new data
        s = mongo_db.add_new_data(user_data)
        return jsonify({'response': s})
    else:
        return jsonify({'out': 'error'})

# K-Means Clustering Algorithm
@application.route('/k_means_clustering/', methods=['GET'])
@cross_origin(support_credentials=True)
def k_means_clustering():
    if request.method == "GET":
        df_final = clustering.ml_preprocessing()
        df_clusters = clustering.k_means_clustering(df_final)
        
        Title_Comp = df_clusters['Title_Comp.'].to_list()
        Title_Female = df_clusters['Title_Female'].to_list()
        Title_Male = df_clusters['Title_Male'].to_list()
        Country_Germany = df_clusters['Country_Germany'].to_list()
        Country_UK = df_clusters['Country_United Kingdom'].to_list()
        Country_USA = df_clusters['Country_United States'].to_list()
        Date_Months = df_clusters['Date_Months'].to_list()
        Clusters = df_clusters['Clusters'].to_list()

        df_final = []
        for i in range(len(df_clusters)):
            x = [Title_Comp[i], Title_Female[i], Title_Male[i], Country_Germany[i], Country_UK[i], Country_USA[i], Date_Months[i], Clusters[i]]
            df_final.append(x)
        
        print(df_final)
        return jsonify({'Columns': ['Title_Comp', 'Title_Female', 'Title_Male', 'Country_Germany', 'Country_UK', 'Country_USA', 'Date_Months', 'Clusters'], 
                        'response': df_final})
    else:
        return jsonify({'out': 'error'})

if __name__ == '__main__':
    application.run(debug=False)