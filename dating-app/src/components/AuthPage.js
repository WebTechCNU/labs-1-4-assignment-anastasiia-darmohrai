import { useState } from "react";
import axios from "axios";

export default function AuthPage({ onAuthSuccess }) {
    const [isRegister, setIsRegister] = useState(false);
    const [form, setForm] = useState({
        username: "",
        password: "",
        name: "",
        age: 18,
        religion: "",
        gender: "",
        location: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
        const payload = isRegister
            ? form
            : { username: form.username, password: form.password };

        try {
            const response = await axios.post(`http://localhost:8080${endpoint}`, payload);
            const token = response.data.token;
            localStorage.setItem("token", token);
            onAuthSuccess(); // callback to switch to user management
        } catch (err) {
            setError(err.response?.data || "Authentication failed");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 mx-auto" style={{ maxWidth: "500px" }}>
                <h3 className="text-center">{isRegister ? "Register" : "Login"}</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="form-control mb-3"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control mb-3"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    {isRegister && (
                        <>
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                className="form-control mb-3"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="number"
                                name="age"
                                placeholder="Age"
                                className="form-control mb-3"
                                value={form.age}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="religion"
                                placeholder="Religion"
                                className="form-control mb-3"
                                value={form.religion}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="gender"
                                placeholder="Gender"
                                className="form-control mb-3"
                                value={form.gender}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                className="form-control mb-3"
                                value={form.location}
                                onChange={handleChange}
                            />
                        </>
                    )}
                    <button className="btn btn-primary w-100" type="submit">
                        {isRegister ? "Register" : "Login"}
                    </button>
                </form>
                <p className="text-center mt-3">
                    {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                        className="btn btn-link p-0"
                        onClick={() => setIsRegister(!isRegister)}
                    >
                        {isRegister ? "Login" : "Register"}
                    </button>
                </p>
            </div>
        </div>
    );
}
