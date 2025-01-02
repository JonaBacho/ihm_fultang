import React from 'react';
import {useNavigate} from 'react-router-dom';

export function LandingPage() {
    const navigate = useNavigate();

    function StatCard({ number, label }) {
        return (
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md w-32">
                <span className="text-2xl font-bold text-secondary">{number}</span>
                <span className="text-sm text-gray-600">{label}</span>
            </div>
        );
    }

    function ServiceCard({ icon, title }) {
        return (
            <div className="flex flex-col items-center p-6 bg-[#50C2B9] rounded-lg">
                <img src={icon} alt={title} className="w-12 h-12" />
                <span className="mt-2 text-white font-medium">{title}</span>
            </div>
        );
    }

    function DoctorCard({ photo, name, speciality }) {
        return (
            <div className="flex flex-col items-center">
                <div className="w-40 h-40 overflow-hidden rounded-lg">
                    <img src={photo} alt={name} className="w-full h-full object-cover" />
                </div>
                <h3 className="mt-2 font-semibold text-secondary">{name}</h3>
                <p className="text-sm text-gray-600">{speciality}</p>
            </div>
        );
    }

    const stats = [
        { number: "500+", label: "Doctor" },
        { number: "50+", label: "Patients" },
        { number: "20+", label: "Expert" },
        { number: "500+", label: "Specializations" }
    ];

    const services = [
        { icon: "/path/to/hospital.svg", title: "Specialized Services" },
        { icon: "/path/to/vaccine.svg", title: "Vaccination" },
        { icon: "/path/to/diagnostic.svg", title: "Diagnostics" },
        { icon: "/path/to/dental.svg", title: "Dental Care" },
        { icon: "/path/to/pharmacy.svg", title: "Pharmacy" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-primary-start to-primary-end">
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            Welcome to Fultang Polyclinic
                        </h1>
                        <p className="text-xl text-white mb-8">
                            The hospital you trust to care about those you love
                        </p>
                        <button
                            onClick={() => navigate("/login")}
                            className="px-8 py-3 bg-secondary text-white rounded-lg font-bold text-xl hover:bg-opacity-90 transition-all"
                        >
                            Log In Now
                        </button>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0">
                        <img src="/path/to/doctor-image.jpg" alt="Doctor" className="rounded-lg shadow-xl" />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
                    {stats.map((stat, index) => (
                        <StatCard key={index} {...stat} />
                    ))}
                </div>

                <section className="my-16">
                    <h2 className="text-3xl font-bold text-white mb-8">Our Services</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>
                </section>

                <section className="my-16">
                    <h2 className="text-3xl font-bold text-white mb-8">Meet Some of Our Doctors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <DoctorCard
                                key={i}
                                photo="/path/to/doctor-photo.jpg"
                                name="Dr. Username"
                                speciality="Dentist"
                            />
                        ))}
                    </div>
                </section>

                <section className="my-16 bg-secondary/80 rounded-lg p-8">
                    <h2 className="text-3xl font-bold text-white mb-4">About Us</h2>
                    <p className="text-white">
                        Fultang Polyclinic is committed to providing exceptional healthcare services...
                    </p>
                </section>
            </div>

            <footer className="bg-secondary/20 py-4 text-center text-white">
                <p>© Fultang Polyclinic {new Date().getFullYear()}</p>
            </footer>
        </div>
    );
}