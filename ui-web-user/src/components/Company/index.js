import React from 'react';

import { 
    Switch, 
    Route, 
    Link, 
    Redirect, 
    useHistory 
} from 'react-router-dom';

import { 
    Button, 
    Input }
from 'antd';

const TAX_NUMBER = 443531283;

const Search = (props) => {
    return(
        <>
            <div>Search Companies</div>
        </>
    )
}
const Saved = (props) => {
    return(
        <>
            <div>Saved Companies</div>
        </>
    )
}
const Page = (props) => {
    return(
        <>
            <h1>Page {props.match.params.tax_number}!</h1>
            <Link to={`/company/${TAX_NUMBER}/edit`} >
                <Button type="primary">
                    <span>
                        Edit
                    </span>
                </Button>
            </Link>
        </>
    )
}
const Edit = (props) => {
    return(
        <>
            <h1>Edit!</h1>
            <Link to={`/company/${TAX_NUMBER}`}>
                <Button type="primary">
                    <span>
                        Save
                    </span>
                </Button>
            </Link>
        </>
    )
}

export default class Company extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    componentDidUpdate() {
        console.log(this.props);
    }
    render() {
        return(
            <Switch>
                <Route exact path="/company/search" component={Search} />
                <Route exact path="/company/saved" component={Saved} />
                <Route exact path={`/company/:${TAX_NUMBER}/edit`}  component={Edit} />
                <Route exact path={`/company/:${TAX_NUMBER}`} component={Page} />
            </Switch>
        )
    }
}