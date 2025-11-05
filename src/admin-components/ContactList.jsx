import React, { useEffect, useState } from "react";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const response = await fetch("http://localhost:3036/api/contact");
      const data = await response.json();
      if (data.success) setContacts(data.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Delete contact
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;
    try {
      const response = await fetch(`http://localhost:3036/api/contact/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) {
        setContacts(contacts.filter((c) => c._id !== id));
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  if (loading) return <p>Loading contacts...</p>;
  if (contacts.length === 0) return <p>No contact messages found.</p>;

  return (
    <div className="contact-list-section">
      <h2>Contact Messages</h2>
      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Date</th>
            <th>Action</th> {/* Action column */}
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact._id}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.message}</td>
              <td>{new Date(contact.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(contact._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactList;
