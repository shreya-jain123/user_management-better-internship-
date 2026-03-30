from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # React aur Flask ko connect karne ke liye zaroori hai

# 1. Database Configuration (Relational - SQLite)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# 2. Database Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

# 3. Database Initialize (Tables create karna)
with app.app_context():
    db.create_all()
    if not User.query.first():
        db.session.add(User(name="Arpan (From DB)"))
        db.session.add(User(name="Zach (From DB)"))
        db.session.commit()

# 4. API Endpoints
@app.route("/api/users", methods=['GET', 'POST'])
def handle_users():
    if request.method == 'GET':
        # Database se saare users nikalna
        all_users = User.query.all()
        return jsonify({"users": [{"id": user.id, "name": user.name} for user in all_users]})

    if request.method == 'POST':
        # Naya user add karna
        data = request.json
        if not data or 'name' not in data:
            return jsonify({"error": "Name is required"}), 400
        
        new_user = User(name=data['name'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"message": "User added successfully!"}), 201
@app.route("/api/users/<int:user_id>", methods=['DELETE'])
def delete_user(user_id):
    user_to_delete = User.query.get(user_id)
    if not user_to_delete:
        return jsonify({"error": "User not found"}), 404
    
    db.session.delete(user_to_delete)
    db.session.commit()
    return jsonify({"message": "User deleted successfully!"}), 200

if __name__ == "__main__":
    app.run(debug=True, port=5000)