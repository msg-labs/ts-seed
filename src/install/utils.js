
const dependencies = [];

const devDependencies = [
    "awesome-typescript-loader",
    "html-webpack-plugin",
    "http-server",
    "typescript",
    "webpack",
    "webpack-dev-server",
    "tslint"
];

const parseParameters = parameters => ( {
    dependencies: [
        ...dependencies,
        ...( parameters.prod || [] )
    ],
    devDependencies: [
        ...devDependencies,
        ...( parameters.dev || [] )
    ]
} );


module.exports.parse = parseParameters;
