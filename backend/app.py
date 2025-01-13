from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_db_connection, init_db

app = Flask(__name__)
CORS(app)

# Initialize the database
init_db()

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

if __name__ == '__main__':
    app.run(port=5000)