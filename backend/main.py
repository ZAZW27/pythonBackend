from flask import request, jsonify
from config import app, db
from models import Contact

# ================================================================
# ==================== To show contacts ==========================
# ================================================================
@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all() # getting all data
    json_contacts = list(map(lambda x: x.to_json(), contacts)) #getting the columns of the data inside of models.py
    return jsonify({"contacts": json_contacts})


# ================================================================
# ================= To Create new contact ========================
# ================================================================
@app.route("/create_contact", methods=["POST"])
def create_contact():
    # Getting the values to insert new contact 
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    phone_number = request.json.get("phoneNumber")
    
    # check if any of the inputs has a null
    if not first_name or not last_name or not email: 
        return (
                jsonify({"message": "You must include first name, last name, and email in order to create a new contact"}), 
                400,    
            )
    # temporary variable to contain the new contact
    new_contact = Contact(
        first_name=first_name, 
        last_name=last_name, 
        email=email, 
        phone_number=phone_number
        )
    
    try: 
        db.session.add(new_contact) # adding all of the temporary contact into session
        db.session.commit() # and will be saved / commmited into database
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": f"User {first_name} created"}), 201


# ================================================================
# =================== To update contact ==========================
# ================================================================
@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = Contact.query.get(user_id) # getting the currently updating user id
    
    if not contact: # checking if user exists
        return jsonify({"message": "user does not exists"}), 404
    
    data = request.json
    # Getting the data (if the data of firstName exists then it will used that else it will use the same one in the database (contact.first_name))
    contact.first_name = data.get("firstName", contact.first_name)
    contact.last_name = data.get("lastName", contact.last_name)
    contact.email = data.get("email", contact.email)
    contact.phone_number = data.get("phoneNumber", contact.email)
    
    db.session.commit()
    
    return jsonify({"message": "User has been updated successfully"}), 200

# ================================================================
# =================== To Delete contact ==========================
# ================================================================
@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = Contact.query.get(user_id)
    
    if not contact:
        return jsonify({"message": "User not found"}), 404
    
    db.session.delete(contact)
    db.session.commit()
    
    return jsonify({"message": "User has been deleted successfully"}), 200

if __name__ == '__main__': 
    with app.app_context():
        print("hello world")
        db.create_all()

    app.run(debug=True)
    
    