import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import mongo_db
from sklearn.cluster import KMeans
from datetime import datetime
from dateutil import relativedelta

# Read Data, drop unnecessary columns and one hot encode data
def ml_preprocessing():
    arr = mongo_db.read_all()
    df = pd.DataFrame(arr, columns = ['CardID', 'CustID', 'Title', 'Country', 'Address', 'PostalCode', 'City', 'Mail', 'BirthDate', 'ValidityDate'])
    df = df.drop(['CardID', 'CustID', 'Address', 'PostalCode', 'City', 'Mail'], axis='columns')
    df_encoded = pd.get_dummies(df, columns = ['Title', 'Country'])

    date_months = []

    # Add columns with number of months between BirthDate and ValidityDate
    for i in range(len(df_encoded)):
        d1 = str(df_encoded.loc[i, 'BirthDate'])[:2] + '/' + str(df_encoded.loc[i, 'BirthDate'])[3:5] + '/' + str(df_encoded.loc[i, 'BirthDate'])[6:10]
        d2 = str(df_encoded.loc[i, 'ValidityDate'])[:2] + '/' + str(df_encoded.loc[i, 'ValidityDate'])[3:5] + '/' + str(df_encoded.loc[i, 'ValidityDate'])[6:10]

        start_date = datetime.strptime(d1, "%d/%m/%Y")
        end_date = datetime.strptime(d2, "%d/%m/%Y")

        # Get the relativedelta between two dates
        delta = relativedelta.relativedelta(end_date, start_date)
        date_months.append(delta.months)

    df_encoded['Date_Months'] = date_months
    df_encoded = df_encoded.drop(['BirthDate', 'ValidityDate'], axis='columns')

    return df_encoded

# K-Means Clustering
def k_means_clustering(df_encoded): 
    kmeans = KMeans(4)
    kmeans.fit(df_encoded)

    identified_clusters = kmeans.fit_predict(df_encoded)

    data_with_clusters = df_encoded.copy()
    data_with_clusters['Clusters'] = identified_clusters

    return data_with_clusters

# df_final = ml_preprocessing()
# print(df_final.head())
# df_clusters = k_means_clustering(df_final)
# print(df_clusters)
