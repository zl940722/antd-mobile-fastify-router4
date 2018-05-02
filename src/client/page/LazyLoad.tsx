import React, {Component} from 'react'

export default class LazyLoad extends Component<any, any> {

    public component;

    constructor(props) {
        super(props);
        this.state = {loaded: false};
    }

    public componentDidMount() {
        this.loadComponent(this.props.component);
    }

    public componentWillReceiveProps(nextProps) {
        if (nextProps.component !== this.props.component) {
            this.setState({loaded: false});
            this.loadComponent(nextProps.component);
        }
    }

    public loadComponent = (componentPromise) => {
        componentPromise.then((module) => {
            this.component = module.default;
            this.setState({loaded: true});
        });
    };

    public render() {
        const {loaded} = this.state;
        if (loaded === true) {
            return (
                <div className="main-page">
                  <this.component {...this.props} />
                </div>
            )
        } else {
            return (<div/>)
        }
    }
}


