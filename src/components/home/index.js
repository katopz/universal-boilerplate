import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from '../header';
import { toggleTodo } from '../../actions/todos';
if(process.env.WEBPACK) require('./index.scss');

import Button from 'muicss/lib/react/button';

class Home extends Component {
	render() {
		const { dispatch, todos } = this.props;

		return (
			<div className='home'>
				<Header title='Home' />
				<div>This is home</div>
				<br />
				{todos.map((todo) => (
					<div key={ todo.id }>
						<span style={ (todo.checked) ? { textDecoration: 'line-through' } : {} }>{ todo.text } </span>
						<Button onClick={() => dispatch(toggleTodo(todo.id))}>Toggle</Button>
					</div>
				))}
				<br/>
				<Link to='/page'>
					<Button color="primary">Go to page</Button>
				</Link>
			</div>
		);
	}
}

export default connect((state) => {
	const { todos } = state;
	return { todos };
})(Home);
