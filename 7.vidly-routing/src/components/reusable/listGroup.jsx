import React from 'react';

const ListGroup = ({items, textProperty, valueProperty, onItemSelect, selectedItem}) => {

    return (
        <div>
            <ul className="list-group">
                {items.map(genre => <li key={'id-' + genre[valueProperty]}
                                        onClick={() => onItemSelect(genre)}
                                        className={selectedItem === genre ? 'list-group-item active' : 'list-group-item'}>

                        {genre[textProperty]}

                    </li>
                )}
            </ul>
        </div>
    );
};


export default ListGroup;

ListGroup.defaultProps = {
    "textProperty": "name",  // manually assigning default props on the child page instead of parent page
    "valueProperty": "_id"
};
