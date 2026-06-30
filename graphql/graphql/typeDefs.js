export const typeDefs = /* GraphQL */ `

    type Student {
        _id: ID!
        regno: String!
        name: String!
        marks: [Mark!]!
    }
    
    type Mark {
        _id: ID!
        mid: Int,
        regno: String,
        hid: Int,
        marks: Float,   
        student: Student,
        head: Head,      
    }

    type Grade{
        _id: ID!
        gradeid: Int,
        start: Int,
        end: Int,
        grade: String,
        gpa: Float        
    }

    type Head{
        _id: ID!
        hid: Int,
        headname: String,
        total: Int,
    }

    type Query {
        students: [Student!]!
        marks: [Mark!]!
        heads: [Head!]!
        grades: [Grade!]!
    }

    type Mutation {
        updateMarks(regno: String!, hid: Int!,marks: Float!): Mark
    }
`;