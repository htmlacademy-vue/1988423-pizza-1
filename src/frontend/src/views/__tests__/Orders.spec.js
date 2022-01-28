import { mount, createLocalVue } from "@vue/test-utils";
import { generateMockStore, createMockApi, authenticateUser } from "@/common/test-utils";
import Orders from "@/views/Orders";
import Vuex from "vuex";
import flushPromises from "flush-promises";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Orders", () => {
  let wrapper;
  let store;
  const stubs = ["OrderInfo"];
  const mocks = {
    $router: {
      push: jest.fn()
    },
  };
  const createComponent = options => {
    wrapper = mount(Orders, options);
  };

  beforeEach(() => {
    store = generateMockStore();
    createMockApi(store);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("redirect if not logged in", async () => {
    createComponent({ localVue, store, stubs, mocks });
    expect(mocks.$router.push).toHaveBeenCalledWith("/");
  });

  it("orders load", async () => {
    await authenticateUser(store);
    createComponent({ localVue, store, stubs, mocks });
    expect(wrapper.find("p").text()).toBe("Заказы загружаются...");
    await flushPromises();
    expect(wrapper.findAll("orderinfo-stub").length).toBe(2);
  });
});
