import React, { Component } from 'react';
import { Waveform } from '@uiball/loaders'

class Loader extends Component {
    render(){
        return(
            <div className="container-loader centered">
                <Waveform
                    size={50}
                    lineWeight={4.5}
                    speed={1}
                    color="#FB9D2E"
                />
                <h1 className="mt-4 loader-text">Loading...</h1>
            </div>
        )
    }
}

export default Loader