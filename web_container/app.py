import sqlite3
from flask import g, Flask, render_template, request, session, redirect, url_for, jsonify
from flask_socketio import join_room, leave_room, send, SocketIO, emit, disconnect
from datetime import datetime


DATABASE="chat.db"
app = Flask(__name__,static_folder="static")
app.config["SECRET_KEY"] = "SIH25010" 
socketio = SocketIO(app)



# #################   DATABASE  #########################
# def get_db():
#     db = getattr(g, "_database", None)
#     if db is None:
#         db = g._database = sqlite3.connect(DATABASE, check_same_thread=False)
#         db.row_factory = sqlite3.Row
#     return db

# def query_db(query, args=(), one=False):
#     cur = get_db().execute(query, args)
#     rv = cur.fetchall()
#     cur.close()
#     return (rv[0] if rv else None) if one else rv

# def execute_db(query, args=()):
#     cur = get_db().cursor()
#     cur.execute(query, args)
#     get_db().commit()
#     return cur.lastrowid
# @app.teardown_appcontext
# def close_connection(exception):
#     db = getattr(g, "_database", None)
#     if db is not None:
#         db.close()


# # ----- DB initialization (run once) -----
# def init_db():
#     db = get_db()
#     cur = db.cursor()
#     # users table: id is user id used for login, username and pincode are required
#     cur.executescript("""
#     CREATE TABLE IF NOT EXISTS users (
#         id INTEGER PRIMARY KEY,
#         username varchar(30) NOT NULL,
#         pincode varchar(6) NOT NULL
#     );

#     CREATE TABLE IF NOT EXISTS messages (
#         message_id INTEGER PRIMARY KEY AUTOINCREMENT,
#         user_id INTEGER NOT NULL,
#         username varchar(30) NOT NULL,
#         pincode varchar(6) NOT NULL,
#         message TEXT NOT NULL,
#         timestamp TEXT NOT NULL,
#         Foreign Key (user_id) References users(id) 
#      );
#     """)
#     db.commit()


# # Create DB and add some sample users if none exist
# with app.app_context():
#     init_db()
#     # Add sample users if table empty (only for demo)
#     users_exist = query_db("SELECT 1 FROM users LIMIT 1", one=True)
#     if not users_exist:
#         execute_db("INSERT INTO users (id, username, pincode) VALUES (?, ?, ?)", (101, "Alice", "400703"))
#         execute_db("INSERT INTO users (id, username, pincode) VALUES (?, ?, ?)", (102, "Bob",   "400703"))
#         execute_db("INSERT INTO users (id, username, pincode) VALUES (?, ?, ?)", (103, "Chinmay","411033"))
#         print("Inserted sample users: 101(Alice), 102(Bob), 103(Chinmay)")



# # ----- Routes -----
# @app.route("/", methods=["GET"])
# def index():
#     if session.get("user_id"):
#         return redirect(url_for("chat"))
#     return render_template("login.html")

# @app.route("/login", methods=["POST"])
# def login():
#     # Login by user id (simple). In real app use proper auth.
#     phone_number = request.form.get("phone")
#     pincode = request.form.get("pincode")
#     if not phone_number:
#         return "Phone Number required", 400
#     user = query_db("SELECT * FROM users WHERE phone_number = ?", (phone_number,), one=True)
#     if user is None:
#         return render_template("login.html", error="User not found. Use sample phone Numbers" )
#     # Save user info in session
#     session["user_id"] = user["user_id"]
#     session["username"] = user["username"]
#     session["pincode"] = user["pincode"]
#     return redirect(url_for("community"))

# @app.route("/community", methods=["GET"])
# def chat():
#     if not session.get("user_id"):
#         return redirect(url_for("/"))
#     return render_template("comm.html", username=session["username"], pincode=session["pincode"])



rooms={}

@app.route("/", methods=["POST", "GET"])
def home():
    return render_template("home.html")

@app.route("/community/", methods=["POST", "GET"])
def community():
    pincode = session.get("pincode")
    # if pincode not in rooms:
    #     return redirect("/") 

    return render_template("comm.html", name=session.get("name"), pincode=session.get("pincode"))


@app.route("/market/", methods=["POST", "GET"])
def market():
    return render_template("market.html")

@app.route("/soil_health/", methods=["POST", "GET"])
def soil():
    return render_template("soil.html")

@app.route("/profile", methods=["POST", "GET"])
def profile():
    return render_template("info.html", name="Pradnyan", pincode= "401502")

@app.route("/accounts", methods=["POST", "GET"])
def accounts():
    if request.method == "POST":
        session.clear()
        name    = request.form.get("name")
        pincode = request.form.get("pincode")
        join = request.form.get("join", False)
        create = request.form.get("create", False)

        if not name:    
            return render_template("accounts.html", error="Please enter name", pincode=pincode, name=name)

        if join!= False and not pincode:
            return render_template("accounts.html", error="Please enter pincode", pincode=pincode, name=name)
        
        rooms[pincode] = { "members":0, "messages":[] }
        
        session["pincode"] = pincode
        session["name"] = name
        print(f"pincode = {pincode}")
        
        return render_template("comm.html" , pincode=pincode)


    return render_template("accounts.html")

# @socketio.on("connect")  # @socketio.on("connect")
# def connect(data):
#     pincode = session.get("pincode")
#     name = session.get("name")
#     print(f"{name} joined Pincode: {pincode}")

#     if not pincode or not name:
#         print("pincode or name missing.")
#         return

#     if pincode not in rooms:
#         leave_room(pincode)
#         return
    
#     name = data["name"]
#     pincode = data["pincode"]

#     join_room(pincode)
#     send({"name":name, "message":"has entered the community"}, to=pincode)
    rooms[pincode]["members"] +=1

@socketio.on("init")
def init(data):
    name = data.get("name")
    pincode = data.get("pincode")
    if not name or not pincode:
        return
    join_room(pincode)
    send({"name": name, "message": "has entered the community"}, to=pincode)


@socketio.on("message")
def Message(data):
    name = data["name"]
    pincode = data["pincode"]
    msg = data["msg"]
    send(f"{name}: {msg}", to=pincode)



if __name__ =="__main__":
    socketio.run(app, debug=True)






# community
# google translator api
# 