import pymssql
import time
import random
SERVER_LOCAL = "localhost"
USER_LOCAL = "sa"
PORT_LOCAL = "1433"
# PASSWORD_LOCAL= "Admin@123"
PASSWORD_LOCAL="MyPass@word"
DB_LOCAL = "projectTriumph"

print("Connecting to server")
list = ["AI", "Finance", "Health", "Education", "Ecomm", "Green Energy", "EV", "Biotech", "Food", "IoT", "Blockchain", "PropTech", "Legal", "Media", "Gaming", "Robotics", "Animation", "AR/VR", "Agritech", "Fashion", "Travel", "Social Impact", "Space", "Supply Chain & Logistics", "Wellness", "HR", "Cybersecurity", "Event", "Pet", "DeepTech", "Drone", "Social Media"]
connLocal = pymssql.connect(server=SERVER_LOCAL, port=PORT_LOCAL, user=USER_LOCAL, password=PASSWORD_LOCAL, database=DB_LOCAL)
cursor = connLocal.cursor()
print("Connected to server")


for i in range(0, 16):
    print("Loop: ", i)
    randomNumber = random.randint(33,64)
    print("Random Number: ", randomNumber)
    sql = "UPDATE newsMain SET topic=%s WHERE ID=%s"
    val = (randomNumber, i+1)
    cursor.execute(sql, val)
    time.sleep(1)

connLocal.commit()
connLocal.close()
print("End")

