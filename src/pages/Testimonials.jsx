import React from "react";

const Testimonials = () => (
    <section className="testimonials" id="testimonials">
        <div className="testimonial-container">
            <h2>What Our Farmers Say</h2>
            <div className="testimonial-grid">
                <div className="testimonial-item">
                    <blockquote>
                        <p>
                            "VERDURE has revolutionized my farming practices. The AI-powered solutions are incredibly
                            accurate and helpful."
                        </p>
                        <cite>- Farmer from Maharashtra</cite>
                    </blockquote>
                </div>
                <div className="testimonial-item">
                    <blockquote>
                        <p>
                            "Thanks to VERDURE, I've successfully cultivated new crops and increased my income. The expert
                            advice is invaluable."
                        </p>
                        <cite>- Agricultural Expert in Punjab</cite>
                    </blockquote>
                </div>
                <div className="testimonial-item">
                    <blockquote>
                        <p>
                            "The comprehensive services provided by VERDURE have made farming more efficient and sustainable
                            for me."
                        </p>
                        <cite>- Experienced Farmer in Gujarat</cite>
                    </blockquote>
                </div>
            </div>
        </div >
    </section>

);

export default Testimonials;