import React from "react";
import { connect } from "react-redux";

import types from "~/types";
import { preventDefault } from "~/utils";

import NextButton from "~/components/nextButton";
import QueryWithLargeInput from "~/components/queryWithLargeInput";
import SagaStep from "./sagaStep";

class SelectContract extends SagaStep {
  componentWillMount() {
    this.state = { address: null };
  }

  setAddress = (address) => {
    this.setState({ address });
  };

  createAction() {
    return {
      type: types.setAddress,
      address: this.state.address,
    };
  }

  render() {
    return (
      <div className="select-address step">
        <form action="/" method="GET" onSubmit={preventDefault(this.action)}>
          <QueryWithLargeInput onChange={this.setAddress}>
            To start, please enter your contract&#39;s address
          </QueryWithLargeInput>

          <div className="text-center">
            <NextButton disabled={!this.state.address} />
          </div>
        </form>
      </div>
    );
  }
}

export default connect(() => ({}))(SelectContract);
