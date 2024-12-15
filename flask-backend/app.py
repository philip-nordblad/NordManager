from flask import Flask, jsonify, render_template, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory storage for simplicity
events = []
expenses = []
tasks = []

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/data')
def get_data():
    data = {"message": "Hello from Flask!"}
    return jsonify(data)

@app.route('/api/events', methods=['GET', 'POST'])
def handle_events():
    if request.method == 'POST':
        event = request.json
        events.append(event)
        return jsonify(event), 201
    return jsonify(events)

@app.route('/api/expenses', methods=['GET', 'POST'])
def handle_expenses():
    if request.method == 'POST':
        expense = request.json
        expenses.append(expense)
        return jsonify(expense), 201
    return jsonify(expenses)

@app.route('/api/tasks', methods=['GET', 'POST'])
def handle_tasks():
    if request.method == 'POST':
        task = request.json
        tasks.append(task)
        return jsonify(task), 201
    return jsonify(tasks)

if __name__ == '__main__':
    app.run(debug=True)