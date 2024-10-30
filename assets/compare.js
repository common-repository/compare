(function( blocks, editor, components, i18n, element ) {
     var el = element.createElement;
     const SVGImagePath = 'M2.25 1h15.5c.69 0 1.25.56 1.25 1.25v15.5c0 .69-.56 1.25-1.25 1.25H2.25C1.56 19 1 18.44 1 17.75V2.25C1 1.56 1.56 1 2.25 1zM17 17V3H3v14h14zM10 6c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm3 5s0-6 3-6v10c0 .55-.45 1-1 1H5c-.55 0-1-.45-1-1V8c2 0 3 4 3 4s1-3 3-3 3 2 3 2z';
     blocks.registerBlockType( 'rapiddev-gutenberg/rapiddev-compare', {
        title: i18n.__( 'Compare two images', 'rd_compare'), 
        icon: 'format-gallery', 
        category: 'common', 
        keywords: [ i18n.__( 'Banner' ), i18n.__( 'CTA' ), i18n.__( 'Shout Out' ) ], 
        attributes: {  
            image_one: {type: 'string'},
            image_two: {type: 'string'},
            image_offset: {type: 'string'},
            orientation: {type: 'string'},
            label_before: {type: 'string'},
            label_after: {type: 'string'},
            block_height: {type: 'string'}
        },
        edit: function( props ) {
            
            //Default values
            if (props.attributes.label_after == '' || props.attributes.label_after == null) {props.setAttributes({label_after: i18n.__('After', 'rd_compare')});}
            if (props.attributes.label_before == '' || props.attributes.label_before == null) {props.setAttributes({label_before: i18n.__('Before', 'rd_compare')});}
            if (props.attributes.block_height == '' || props.attributes.block_height == null) {props.setAttributes({block_height: '450'});}
            if (props.attributes.image_offset == '' || props.attributes.image_offset == null) {props.setAttributes({image_offset: '5'});}
            
            return [
                el( 'div', { className: props.className },
                    el('div', {style: {width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif', fontSize: '13px'}},
                        el('span', {class: 'dashicons dashicons-format-gallery'}),
                        el('span', {class: 'components-placeholder__label', style: {display: 'block', paddingLeft: '10px', paddingTop: '10px'}}, i18n.__( 'Compare two images', 'rd_compare'))
                    ),
                    el('div', {style: {width: '100%', display: 'flex', alignItems: 'center'}},
                        el('div', {style: {width: '70%'}},
                            el( components.TextControl, {
                                type: 'url',
                                placeholder: i18n.__('Obrazek #1', 'rd_compare'),
                                value: props.attributes.image_one,
                                onChange: function(content){props.setAttributes({image_one: content});},
                            })
                        ),
                        el('div', {style: {width: '30%', paddingLeft: '20px', marginBottom: '8px'}},
                            el(editor.MediaUpload, {
                                onSelect: function(content) {return props.setAttributes({image_one: content.url});},
                                type: 'image',
                                render: function(obj) {
                                    return el( components.Button, {style: {width:'100%', display: 'flex', justifyContent: 'center', height: '31px'}, className: 'components-icon-button image-block-btn is-button is-default is-large',onClick: obj.open},
                                        el( 'svg', {className: 'dashicon dashicons-edit', width: '20', height: '20'},el('path', {d: SVGImagePath}))
                                    );
                                }
                            })
                        )
                    ),
                    el('div', {style: {width: '100%', display: 'flex', alignItems: 'center'}},
                        el('div', {style: {width: '70%'}},
                            el( components.TextControl, {
                                type: 'url',
                                placeholder: i18n.__('Obrazek #2', 'rd_compare'),
                                value: props.attributes.image_two,
                                onChange: function(content){props.setAttributes({image_two: content});},
                            })
                        ),
                        el('div', {style: {width: '30%', paddingLeft: '20px', marginBottom: '8px'}},
                            el(editor.MediaUpload, {
                                onSelect: function(content) {return props.setAttributes({image_two: content.url});},
                                type: 'image',
                                render: function(obj) {
                                    return el( components.Button, {style: {width:'100%', display: 'flex', justifyContent: 'center', height: '31px'}, className: 'components-icon-button image-block-btn is-button is-default is-large',onClick: obj.open},
                                        el( 'svg', {className: 'dashicon dashicons-edit', width: '20', height: '20'},el('path', {d: SVGImagePath}))
                                    );
                                }
                            })
                        )
                    ),
                    el( components.SelectControl, {
                        label: i18n.__('Orientation', 'rd_compare'),
                        value: props.attributes.orientation,
                        options: [{value: 'horizontal', label: i18n.__('Horizontal', 'rd_compare')}, {value: 'vertical', label: i18n.__('Vertical', 'rd_compare')}],
                        onChange: function(content){props.setAttributes({orientation: content});},
                    }),
                    el( components.TextControl, {
                        type: 'number',
                        label: i18n.__('Block height (px)', 'rd_compare'),
                        placeholder: i18n.__('Max height', 'rd_compare'),
                        value: props.attributes.block_height,
                        onChange: function(content){props.setAttributes({block_height: content});},
                    }),
                    el( components.TextControl, {
                        type: 'number',
                        label: i18n.__('Offset ratio', 'rd_compare')+' (0-10)',
                        placeholder: i18n.__('Offset', 'rd_compare'),
                        min: 0,
                        max: 10,
                        value: props.attributes.image_offset,
                        onChange: function(content){props.setAttributes({image_offset: content});},
                    }),
                    el( components.TextControl, {
                        type: 'text',
                        label: i18n.__('Labels', 'rd_compare'),
                        placeholder: i18n.__('Before label', 'rd_compare'),
                        value: props.attributes.label_before,
                        onChange: function(content){props.setAttributes({label_before: content});},
                    }),
                    el( components.TextControl, {
                        type: 'text',
                        placeholder: i18n.__('After label', 'rd_compare'),
                        value: props.attributes.label_after,
                        onChange: function(content){props.setAttributes({label_after: content});},
                    })
                ),
                el( editor.InspectorControls, { key: 'inspector' }, // Display the block options in the inspector panel.
                    el( components.PanelBody, {
                        title: i18n.__( 'Images compare', 'rd_compare' ),
                        className: 'block-gb-cta-link',
                        initialOpen: true,
                        },
                        el( components.TextControl, {
                            type: 'url',
                            label: i18n.__( 'Enter the destination URL for the button' ),
                            value: props.attributes.buttonURL,
                            onChange: function( newButtonURL ) {
                                props.setAttributes( { buttonURL: newButtonURL } );
                            },
                        } ),
                    ),
                ),              
            ];
        },

        save: function( props ) {
            var attributes = props.attributes;
            return el( 'div', {class: 'rapiddev-compare-block twentytwenty-container', style: {width: '100%', minHeight: attributes.block_height+'px', maxHeight: attributes.block_height+'px'}, compare_lb: attributes.label_before, compare_la: attributes.label_after, compare_orientation: attributes.orientation, compare_offset: (attributes.image_offset / 10)},
                el('img',{alt: 'Compare images', src: attributes.image_one}),
                el('img',{alt: 'Compare images', src: attributes.image_two})
            );
        }

    } );
})(window.wp.blocks,window.wp.editor,window.wp.components,window.wp.i18n,window.wp.element);