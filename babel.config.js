module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./"              // Point to root project directory
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"]
        }
      ],
      "react-native-reanimated/plugin"
    ]
  };
};

