export default function DoctorCard({ doctor }) {
  return (
    <div className="col-12 col-md-6 col-lg-3">
      <div className="card shadow-sm border-0 h-100">
        <img
          src={doctor.image}
          className="card-img-top doctor-img"
          alt={doctor.name}
          style={{ objectFit: "cover", height: 280 }}
        />
        <div className="card-body text-center">
          <h5 className="card-title fw-bold">{doctor.name}</h5>
          <p className="text-muted">{doctor.specialty}</p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <a href={doctor.social.twitter} target="_blank" rel="noreferrer" className="text-primary fs-5">
              <i className="bi bi-twitter"></i>
            </a>
            <a href={doctor.social.facebook} target="_blank" rel="noreferrer" className="text-primary fs-5">
              <i className="bi bi-facebook"></i>
            </a>
            <a href={doctor.social.linkedin} target="_blank" rel="noreferrer" className="text-primary fs-5">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
