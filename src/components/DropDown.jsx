import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const CustomMenu = React.forwardRef(
	({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
		const [value, setValue] = useState('');

		return (
			<div
				ref={ref}
				style={style}
				className={className}
				aria-labelledby={labeledBy}
			>
				<Form.Control
					autoFocus
					className='mx-3 my-2 w-auto'
					placeholder='Type to filter...'
					onChange={e => setValue(e.target.value)}
					value={value}
				/>
				<ul className='list-unstyled'>
					{React.Children.toArray(children).filter(
						child =>
							!value || child.props.children.toLowerCase().startsWith(value)
					)}
				</ul>
			</div>
		);
	}
);

export const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
	<Button
		className='w-25'
		variant='dark'
		ref={ref}
		onClick={e => {
			e.preventDefault();
			onClick(e);
		}}
	>
		{children}
		&#x25bc;
	</Button>
));
