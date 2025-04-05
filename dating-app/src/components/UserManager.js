import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [form, setForm] = useState({ name: "", age: 18, religion: "", gender: "", location: "" });
    const [editForm, setEditForm] = useState({ id: "", name: "", age: 18, religion: "", gender: "", location: "" });
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/users");
            setUsers(response.data);
            setCurrentIndex(0);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEditChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/api/users", form);
            setForm({ name: "", age: 18, religion: "", gender: "", location: "" });
            fetchUsers();
        } catch (error) {
            console.error("Error submitting user:", error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/users/${editForm.id}`, editForm);
            setShowModal(false);
            fetchUsers();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleEdit = (user) => {
        setEditForm(user);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        console.log("Deleting user with ID:", id);
        try {
            const response = await axios.delete(`http://localhost:8080/api/users/${id}`, {
                headers: { "Content-Type": "application/json" },
            });
            console.log("Delete response:", response);
            fetchUsers(); 
        } catch (error) {
            console.error("Error deleting user:", error.response?.data || error.message);
        }
    };


    const handleNext = () => {
        if (users.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % users.length);
        }
    };

    const handlePrev = () => {
        if (users.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + users.length) % users.length);
        }
    };

    return (
        <div className="container py-4">
            <h2 className="text-center mb-4">User Management</h2>

            <div className="card p-4 mb-4">
                <h4 className="mb-3">Create User</h4>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <input type="text" className="form-control" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <input type="number" className="form-control" name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" name="religion" placeholder="Religion" value={form.religion} onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" name="gender" placeholder="Gender" value={form.gender} onChange={handleChange} />
                        </div>
                        <div className="col-12">
                            <input type="text" className="form-control" name="location" placeholder="Location" value={form.location} onChange={handleChange} />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3 w-100">Create User</button>
                </form>
            </div>

            {users.length > 0 ? (
                <div className="card p-4 shadow">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="m-0">User Profile</h5>
                        <div className="small text-muted">
                            {currentIndex + 1} / {users.length}
                        </div>
                    </div>

                    <div className="d-flex justify-content-center align-items-center">
                        <button className="btn btn-lg btn-outline-primary rounded-circle me-4" onClick={handlePrev} style={{ width: "50px", height: "50px" }}>{"←"}</button>

                        <div className="card text-center p-4 shadow-lg" style={{ width: "22rem" }}>
                            <img src={`https://i.pravatar.cc/150?u=${users[currentIndex].id}`} alt="User Avatar" className="rounded-circle mx-auto mb-3" style={{ width: "100px", height: "100px" }} />
                            <h4>{users[currentIndex].name}</h4>
                            <p className="text-muted">{users[currentIndex].age} years old</p>
                            <p className="text-muted">{users[currentIndex].gender} | {users[currentIndex].religion}</p>
                            <p className="text-muted">{users[currentIndex].location}</p>
                            <div className="mt-3">
                                <button className="btn btn-success me-2" onClick={() => handleEdit(users[currentIndex])}>Edit</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(users[currentIndex].id)}>Delete</button>
                            </div>
                        </div>

                        <button className="btn btn-lg btn-outline-primary rounded-circle ms-4" onClick={handleNext} style={{ width: "50px", height: "50px" }}>{"→"}</button>
                    </div>
                </div>
            ) : (
                <p className="text-center">No users found. Add a user above.</p>
            )}

            {showModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit User</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleEditSubmit}>
                                    <input type="text" className="form-control mb-2" name="name" placeholder="Name" value={editForm.name} onChange={handleEditChange} required />
                                    <input type="number" className="form-control mb-2" name="age" placeholder="Age" value={editForm.age} onChange={handleEditChange} required />
                                    <input type="text" className="form-control mb-2" name="religion" placeholder="Religion" value={editForm.religion} onChange={handleEditChange} />
                                    <input type="text" className="form-control mb-2" name="gender" placeholder="Gender" value={editForm.gender} onChange={handleEditChange} />
                                    <input type="text" className="form-control mb-2" name="location" placeholder="Location" value={editForm.location} onChange={handleEditChange} />
                                    <button type="submit" className="btn btn-primary w-100">Save Changes</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
