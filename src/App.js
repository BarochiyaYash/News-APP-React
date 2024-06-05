import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import React, { Component } from "react";
import NavBars from "./components/NavBars";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;

  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            height={4}
            color="#f11946"
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />

          <NavBars />
          <Routes>
            <Route
              key="general"
              path="/"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={12}
                  country="in"
                  category="general"
                />
              }
            ></Route>
            <Route
              key="business"
              path="/business"
              exact
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={12}
                  country="in"
                  category="business"
                />
              }
            ></Route>
            <Route
              key="entertainment"
              path="/entertainment"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={12}
                  country="in"
                  category="entertainment"
                />
              }
            ></Route>
            <Route
              key="general"
              path="/general"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={12}
                  country="in"
                  category="general"
                />
              }
            ></Route>
            <Route
              key="health"
              path="/health"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={12}
                  country="in"
                  category="health"
                />
              }
            ></Route>
            <Route
              key="science"
              path="/science"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={12}
                  country="in"
                  category="science"
                />
              }
            ></Route>
            <Route
              key="sports"
              path="/sports"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={12}
                  country="in"
                  category="sports"
                />
              }
            ></Route>
            <Route
              key="technology"
              path="/technology"
              element={
                <News
                  setProgress={this.setProgress}
                  apiKey={this.apiKey}
                  pageSize={12}
                  country="in"
                  category="technology"
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>
    );
  }
}
