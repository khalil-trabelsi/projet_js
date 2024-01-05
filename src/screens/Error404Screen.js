const Error404Screen = {
    after_render: async() =>  {
        
    },
    render: () => {
        return `<div>
        <strong>404.</strong><span>That's an error</span>
        <p>
            The requested URL was not found on this server.
        </p>
        </div>`
    }
}
export default Error404Screen;