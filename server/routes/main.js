const coreMemberRoutes = require("./Core Members/coreMembersRoutes");
const certificateRoutes = require("./Certificates/certificateRoutes");
const eventRoutes = require("./Events/eventRoutes");

app.use(coreMemberRoutes);
app.use(certificateRoutes);
app.use(eventRoutes);
