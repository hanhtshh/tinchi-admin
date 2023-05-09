interface IConfig {
  service_host: string;
}

const config = <IConfig>{
  service_host: process.env.NEXT_PUBLIC_SERVICE_HOST || "https://tinchi-sv.onrender.com/tinchi",
};

export default config;
