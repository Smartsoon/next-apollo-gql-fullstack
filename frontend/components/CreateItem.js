import React, {Component} from 'react';
import { Mutation } from 'react-apollo';
import gql from "graphql-tag";
import Router from 'next/router';
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import Error from './ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
    $title: String!
    $decription: String!
    $image: String
    $largeImage: String
    $price: Int!
    ) {
    createItem(
        title: $title
        decription: $decription
        image: $image
        largeImage: $largeImage
        price: $price
    ) {
    id
    }
    }
`;

class CreateItem extends Component {
    state = {
        title: '',
        decription: '',
        image: '',
        largeImage: '',
        price: 0
    };

    handleChange = (e) => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({
            [name]: val
        })
    };

    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
                {(createItem, { loading, error, called, data }) => (
                    <Form onSubmit={async e => {
                        e.preventDefault();
                        const res = await createItem();
                        console.log(res)
                        Router.push({
                            pathname: '/item',
                            query: { id: res.data.createItem.id }
                        })
                    }}>
                        <Error error={error}/>
                        <fieldset disabled={loading} aria-busy={loading}>
                            <label htmlFor="title">
                                Title
                                <input type="text" id="title" name="title" placeholder="Title" required value={this.state.title} onChange={this.handleChange}/>
                            </label>

                            <label htmlFor="price">
                                Price
                                <input type="number" id="price" name="price" placeholder="Price" required value={this.state.price} onChange={this.handleChange}/>
                            </label>

                            <label htmlFor="decription">
                                Decription
                                <textarea id="decription" name="decription" placeholder="Decription" required value={this.state.decription} onChange={this.handleChange}/>
                            </label>

                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>

        );
    }
}

export default CreateItem;
// export default { CREATE_ITEM_MUTATION }
