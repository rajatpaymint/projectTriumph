import pandas as pd

# Replace with your actual file path and column name
df = pd.read_excel('cityList.xlsx')
names_list = df['Name'].tolist()

with open('names_list.txt', 'w') as file:
    for name in names_list:
        file.write(name + '\n')