from flask import Flask, request, jsonify  
from flask_cors import CORS
from database import get_db_connection

app = Flask(__name__)
CORS(app)

@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    conn = get_db_connection()
    expenses = conn.execute("SELECT * FROM expenses").fetchall()
    conn.close()
    return jsonify([dict(row) for row in expenses])

@app.route('api/expenses', methods=['POST'])
def add_expense():
    new_expense = request.get_json()
    title = new_expense['title']
    amount = new_expense['amount']
    conn = get_db_connection()
    conn.execute(f"INSERT INTO expenses (title, amount) VALUES (?,?)",(title,amount))
    conn.commit()
    conn.close()
    return '', 201

@app.route('api/tasks', methods=['GET'])
def get_tasks():
    conn = db_get_connection()
    