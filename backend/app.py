from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from database import get_db_connection

app = Flask(__name__)
CORS(app)

@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    conn = get_db_connection()
    expenses = conn.execute('SELECT * FROM expenses').fetchall()
    conn.close()
    return jsonify([dict(row) for row in expenses])

@app.route('/api/expenses', methods=['POST'])
def add_expense():
    new_expense = request.get_json()
    name = new_expense['name']
    amount = new_expense['amount']
    conn = get_db_connection()
    conn.execute('INSERT INTO expenses (name, amount) VALUES (?, ?)', (name, amount))
    conn.commit()
    conn.close()
    return '', 201

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    conn = get_db_connection()
    tasks = conn.execute('SELECT * FROM tasks').fetchall()
    conn.close()
    return jsonify([dict(row) for row in tasks])

@app.route('/api/tasks', methods=['POST'])
def add_task():
    new_task = request.get_json()
    name = new_task['name']
    completed = new_task['completed']
    conn = get_db_connection()
    conn.execute('INSERT INTO tasks (name, completed) VALUES (?, ?)', (name, completed))
    conn.commit()
    conn.close()
    return '', 201

@app.route('/api/events', methods=['GET'])
def get_events():
    conn = get_db_connection()
    events = conn.execute('SELECT * FROM events').fetchall()
    conn.close()
    return jsonify([dict(row) for row in events])

@app.route('/api/events', methods=['POST'])
def add_event():
    new_event = request.get_json()
    name = new_event['name']
    date = new_event['date']
    conn = get_db_connection()
    conn.execute('INSERT INTO events (name, date) VALUES (?, ?)', (name, date))
    conn.commit()
    conn.close()
    return '', 201

if __name__ == '__main__':
    app.run(port=5000)