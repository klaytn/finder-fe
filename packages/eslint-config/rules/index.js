module.exports = {
    extends: ['./base', './prettier', './react', './typescript'].map((e) => require.resolve(e)),
}
