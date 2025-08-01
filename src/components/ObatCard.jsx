export default function ObatCard({ data }) {
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-primary">{data.nama}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{data.jenis}</h6>
        <p className="card-text">{data.kegunaan}</p>
        <p className="mb-1">
          <strong>Stok:</strong> {data.stok}
        </p>
        <p className="mb-0">
          <strong>Harga:</strong> Rp{data.harga.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
