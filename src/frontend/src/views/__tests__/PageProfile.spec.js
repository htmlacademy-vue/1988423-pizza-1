import {
  mount,
  createLocalVue,
} from "@vue/test-utils";
import {
  generateMockStore,
  createMockApi,
  authenticateUser,
  fillAddresses,
} from "@/tests/helpers";
import PageProfile from "@/views/PageProfile";
import Vuex from "vuex";
import AppButton from "@/common/components/AppButton";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component("AppButton", AppButton);

describe("PageProfile", () => {
  let wrapper;
  let store;
  const stubs = ["ProfileCard", "ProfileAddress"];
  const mocks = {
    $router: {
      push: jest.fn(),
    },
  };
  const createComponent = (options) => {
    wrapper = mount(PageProfile, options);
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

  it("profile works", async () => {
    await authenticateUser(store);
    await fillAddresses(store);
    createComponent({ localVue, store, stubs, mocks });
    expect(wrapper.findAll("profileaddress-stub").length).toBe(2);
    await wrapper.find("button").trigger("click");
    expect(wrapper.findAll("profileaddress-stub").length).toBe(3);
  });
});
