import type { SvgIconProps } from "@mui/material";
import { useTheme } from "@mui/material";

export const SvgsDrop = (props: SvgIconProps) => {
  const theme = useTheme();

  const { butterflyBlue } = theme.palette.app.color;

  const fill = props.fill ?? butterflyBlue[900];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={57}
      height={49}
      fill="none"
      {...props}
      style={{ color: "inherit" }}
    >
      <path
        fill={fill ?? "currentColor"}
        d="M29.399 12.005a.602.602 0 0 1-.401-.748c1.096-3.718 4.511-6.448 8.575-6.448a.6.6 0 0 1 .596.602.6.6 0 0 1-.596.602c-3.406 0-6.462 2.297-7.432 5.587a.595.595 0 0 1-.742.405Z"
      />
      <path
        fill={fill ?? "currentColor"}
        d="M45.923 34.898h-3.578a.6.6 0 0 1-.597-.602.6.6 0 0 1 .597-.602h3.578c4.932 0 8.946-4.049 8.946-9.025 0-4.977-4.014-9.026-8.946-9.026h-.086a.594.594 0 0 1-.45-.208.605.605 0 0 1-.14-.48c.053-.374.08-.75.08-1.117 0-4.313-3.479-7.823-7.754-7.823-1.663 0-3.249.525-4.586 1.517a.594.594 0 0 1-.882-.205C28.317.05 18.422-.928 13.292 5.403a11.475 11.475 0 0 0-2.33 9.519.6.6 0 0 1-.584.721h-.24c-4.932 0-8.945 4.05-8.945 9.026 0 4.977 4.013 9.026 8.946 9.026h3.578a.6.6 0 0 1 .596.601.6.6 0 0 1-.596.602H10.14C4.549 34.898 0 30.31 0 24.67c0-5.482 4.297-9.97 9.67-10.218a12.672 12.672 0 0 1 2.698-9.81c5.493-6.779 16.019-6.019 20.468 1.54a8.81 8.81 0 0 1 4.737-1.368c5.18 0 9.283 4.447 8.924 9.643 5.325.302 9.565 4.767 9.565 10.213 0 5.64-4.549 10.229-10.14 10.229h.001Z"
      />
      <path
        fill={fill ?? "currentColor"}
        d="M27.95 49c-8.222 0-14.91-6.748-14.91-15.043 0-8.295 6.688-15.043 14.91-15.043 8.22 0 14.91 6.748 14.91 15.043C42.86 42.252 36.17 49 27.95 49Zm0-28.882c-7.564 0-13.718 6.208-13.718 13.839s6.154 13.84 13.717 13.84c7.564 0 13.717-6.21 13.717-13.84s-6.153-13.84-13.717-13.84Z"
      />
      <path
        fill={fill ?? "currentColor"}
        stroke={fill ?? "currentColor"}
        d="M27.29 40.013c0 .516.414.94.936.94a.938.938 0 0 0 .936-.94V28.56a.939.939 0 0 0-.936-.94.939.939 0 0 0-.937.94v11.453Z"
      />
      <path
        fill={fill ?? "currentColor"}
        stroke={fill ?? "currentColor"}
        d="m32.028 31.772.355-.352a.943.943 0 0 1 0 1.327.933.933 0 0 1-.663.277l.308-1.252Zm0 0 .355-.352-3.493-3.524a.934.934 0 0 0-1.328 0l.356.352-.356-.351 4.466 3.875Zm-3.801-1.879-2.83 2.854 2.83-2.854Zm0 0 2.829 2.854a.934.934 0 0 0 .664.277l-3.493-3.131Z"
      />
    </svg>
  );
};
