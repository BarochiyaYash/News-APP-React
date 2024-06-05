import React, { Component } from "react";

function formatDateTime(timestamp) {
  const dataobj = new Date(timestamp);
  const date = dataobj.toLocaleDateString();
  const time = dataobj.toLocaleTimeString();
  return { date, time };
}

export class NewsItems extends Component {
  render() {
    let { title, description, imageUrl, authorName, newsUrl, date, sources } =
      this.props;

    const { date: formattedDate, time: formattedTime } = formatDateTime(date);
    return (
      <>
        <div>
          <div className="my-3">
            <div className="card">
              <img
                src={
                  imageUrl
                    ? imageUrl
                    : "https://imgs.hipertextual.com/wp-content/uploads/2023/03/robot_usando_macbook_ilustracion.jpg"
                }
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}</p>
                <p class="card-text">
                  <span class="badge rounded-pill text-bg-secondary">
                    {sources}
                  </span>{" "}
                  <small className="text-body-secondary">
                    By {authorName ? authorName : "Unknown"} on {formattedDate} at {formattedTime}
                  </small>
                </p>
                <a
                  rel="noreferrer"
                  href={newsUrl}
                  target="_blank"
                  className="btn btn-dark"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default NewsItems;
