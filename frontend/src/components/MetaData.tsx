import { Helmet } from 'react-helmet'
const MetaData = ({ title }: { title: string }) => {
    return (
        <Helmet>
            <title>{`${title} - Ecommerce `}</title>
        </Helmet>
    )
}

export default MetaData
