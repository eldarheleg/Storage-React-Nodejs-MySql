function Dashboard() {
  return (
    <div className="container-fluid">
      <section>
        <div className="row">
          <div className="col-12 mt-3 mb-1">
            <h5 className="text-uppercase">Statistics With Subtitle</h5>
            <p>Statistics on minimal cards with Title &amp; Sub Title.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6 col-md-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between p-md-1">
                  <div className="d-flex flex-row">
                    <div className="align-self-center">
                      <i className="fas fa-pencil-alt text-info fa-3x me-4"></i>
                    </div>
                    <div>
                      <h4>Total Posts</h4>
                      <p className="mb-0">Monthly blog posts</p>
                    </div>
                  </div>
                  <div className="align-self-center">
                    <h2 className="h1 mb-0">18,000</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-md-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between p-md-1">
                  <div className="d-flex flex-row">
                    <div className="align-self-center">
                      <i className="far fa-comment-alt text-warning fa-3x me-4"></i>
                    </div>
                    <div>
                      <h4>Total Comments</h4>
                      <p className="mb-0">Monthly blog posts</p>
                    </div>
                  </div>
                  <div className="align-self-center">
                    <h2 className="h1 mb-0">84,695</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6 col-md-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between p-md-1">
                  <div className="d-flex flex-row">
                    <div className="align-self-center">
                      <h2 className="h1 mb-0 me-4">$76,456.00</h2>
                    </div>
                    <div>
                      <h4>Total Sales</h4>
                      <p className="mb-0">Monthly Sales Amount</p>
                    </div>
                  </div>
                  <div className="align-self-center">
                    <i className="far fa-heart text-danger fa-3x"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-md-12 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between p-md-1">
                  <div className="d-flex flex-row">
                    <div className="align-self-center">
                      <h2 className="h1 mb-0 me-4">$36,000.00</h2>
                    </div>
                    <div>
                      <h4>Total Cost</h4>
                      <p className="mb-0">Monthly Cost</p>
                    </div>
                  </div>
                  <div className="align-self-center">
                    <i className="fas fa-wallet text-success fa-3x"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
