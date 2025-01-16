from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_db_connection, init_db
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user


app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager()
login_manager.init_app(app)
app.config['SECRET KEY'] = 'my_cool_key'



# Initialize the database
init_db()

# Set up User 
class User(UserMixin):
    def __init__(self, id, username,email,password,firstname,lastname):
        self.id = id
        self.username = username
        self.email = email
        self.password = password
        self.firstname = firstname
        self.lastname = lastname

@login_manager.user_loader
def load_user(user_id):
    conn = get_db_connection
    user = conn.execute("SELECT * FROM users where id = ?", (user_id,)).fetchone()
    conn.close()
    if user:
        return User(user['id'], user['username'], user['email'], user['password'], user['firstname'], user['lastname'])
    return None

@app.route("/api/register", methods = ['POST'])
def register():
    data = request.get_json()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    conn = get_db_connection()
    conn.execute("INSERT INTO users (username, email, password, firstname, lastname) VALUES (?, ?, ?, ?, ?)", (data['username'], data['email'], data['password'], data['firstname'], data['lastname']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'User registerd successfully'}), 201


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    conn = get_db_connection()
    user = conn.execute("SELECT * FROM users WHERE email = ?", (data['email'])).fetchone()
    conn.close()
    if user and bcrypt.check_password_hash(user['password'], data['password']):
        user_obj = User(user['id'], user['username'], user['email'], user['password'], user['firstname'], user['lastname'])
        login_user(user_obj)
        return jsonify({'message': 'Logged in successfully'}), 200
    return jsonify({'message': 'Invalid Credentials'}), 401

@app.route('/api/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify({'message' : "Logged out successfully"}), 200




@app.route("/api/expenses", methods=["GET"])
def get_expenses():
    conn = get_db_connection()
    expenses = conn.execute("SELECT * FROM expenses").fetchall()
    conn.close()
    return jsonify([dict(row) for row in expenses])

@app.route("/api/expenses", methods=["POST"])
def add_expense():
    new_expense = request.get_json()
    title = new_expense["title"]
    amount = new_expense["amount"]
    conn = get_db_connection()
    conn.execute("INSERT INTO expenses (title, amount) VALUES (?, ?)", (title, amount))
    conn.commit()
    expense_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    conn.close()
    return jsonify({"id": expense_id, "title": title, "amount": amount}), 201

@app.route("/api/expenses/<int:id>", methods=["DELETE"])
def delete_expense(id):
    conn = get_db_connection()
    conn.execute("DELETE FROM expenses WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return "", 204

@app.route("/api/tasks", methods=["GET"])
def get_tasks():
    conn = get_db_connection()
    tasks = conn.execute("SELECT * FROM tasks").fetchall()
    conn.close()
    return jsonify([dict(row) for row in tasks])

@app.route("/api/tasks", methods=["POST"])
def add_task():
    new_task = request.get_json()
    name = new_task['name']
    completed = new_task['completed']
    conn = get_db_connection()
    conn.execute('INSERT INTO tasks (name, completed) VALUES (?, ?)', (name, completed))
    conn.commit()
    task_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    conn.close()
    return jsonify({"id" : task_id, "name" : name, "completed" : completed}), 201

@app.route("/api/events", methods=["GET"])
def get_events():
    conn = get_db_connection()
    events = conn.execute("SELECT * FROM events").fetchall()
    conn.close()
    return jsonify([dict(row) for row in events])

@app.route("/api/events", methods=["POST"])
def add_event():
    new_event = request.get_json()
    name = new_event['name']
    date = new_event['date']
    conn = get_db_connection()
    conn.execute('INSERT INTO events (name, date) VALUES (?, ?)', (name, date))
    conn.commit()
    task_id = conn.execute("SELECT last_insert_rowid()").fetchone()[0]
    conn.close()
    return jsonify({"id" : task_id, "name" : name, "date": date}), 201

@app.route("/api/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    conn = get_db_connection()
    conn.execute("DELETE FROM tasks WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return "", 204

@app.route("/api/events/<int:id>", methods=["DELETE"])
def delete_event(id):
    conn = get_db_connection()
    conn.execute("DELETE FROM events WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return "", 204


if __name__ == '__main__':
    app.run(port=5000)